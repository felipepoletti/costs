import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import Loading from "../layout/Loading";
import Message from "../layout/Message";
import ProjectCard from "../project/ProjectCard";

import styles from "./Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  const location = useLocation();
  let message = '';

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err))
    }, 300)
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((resp) => resp.json())
    .then(data => {
      setProjects(projects.filter((project) => project.id !== id));
      // message
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>My projects</h1>
        <LinkButton to="/newproject" text="Create a project"/>
      </div>
      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        {projects.length > 0 && 
          projects.map((project) => (
            <ProjectCard 
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
          {!removeLoading && <Loading />}
          {removeLoading && projects.length === 0 &&
            <p>There's no registered projects!</p>
          }
      </Container>
    </div>
  );
}

export default Projects;
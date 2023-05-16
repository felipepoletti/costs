import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { parse, v4 as uuidv4 } from "uuid";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);

  useEffect(() => {
    setTimeout(() => { 
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setServices(data.services);
      })
      .catch((err) => console.log(err))
    }, 1000)
  }, [id]);

  function editPost(project) {
    if (project.budget < project.cost) {
      return false;
    }

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then(resp => resp.json())
    .then((data) => {
      setProject(data);
      setShowProjectForm(false);
    })
    .catch(err => console.log(err)); 
  }

  function createService(project) {

    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      alert('Over budget! Verify the service cost.');
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then(resp => resp.json())
    .then((data) => {
      setShowServiceForm(false);
    })
    .catch(err => console.log(err)); 
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectUpdated)
    })
    .then(resp => resp.json())
    .then((data) => {
      setProject(projectUpdated);
      setServices(servicesUpdated);
    })
    .catch(err => console.log(err)); 
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return <>
    {project.name ? (
     <div className={styles.project_details}>
      <Container customClass="column">
        <div className={styles.details_container}>
          <h1>Project: {project.name}</h1>
          <button onClick={toggleProjectForm} className={styles.btn}>
            { !showProjectForm ? 'Edit project' : 'Close edit' }
          </button>
          {!showProjectForm ? (
            <div className={styles.project_info}>
              <p>
                <span>Category:</span> {project.category.name}
              </p>
              <p>
                <span>Budget:</span> ${project.budget}
              </p>
              <p>
                <span>Budget used:</span> {project.cost}
              </p>
            </div>
          ) : (
            <div className={styles.project_info}>
              <ProjectForm 
                handleSubmit={editPost} 
                btnText="Finish edition" 
                projectData={project}
              />
            </div>
          )}
        </div>
        <div className={styles.service_form_container}>
            <h2>Add a service:</h2>
            <button onClick={toggleServiceForm} className={styles.btn}>
            { !showServiceForm ? 'Add services' : 'Close' }
          </button>
          <div className={styles.project_info}>
            {showServiceForm && (
              <ServiceForm
                handleSubmit={createService}
                btnText="Add service"
                projectData={project}
              />
            )}
          </div>
        </div>
        <h2>Services</h2>
        <Container customClass="start">
          {services.length > 0 &&
            services.map((service) => (
              <ServiceCard 
                id={service.id}
                name={service.name}
                cost={service.cost}
                description={service.description}
                key={service.id}
                handleRemove={removeService}
              />
            ))
          }
          {services.length === 0 &&
            <p>There's no services registered.</p>
          }
        </Container>
      </Container>
     </div>
    ) : (
      <Loading />
    )}
  </>
}

export default Project;
import  ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
  return (
    <div className={styles.newproject_container}>
      <h1>Create a new project</h1>
      <p>Create your new project and then add your services</p>
      <ProjectForm btnText="Create project"/>
    </div>
  );
}

export default NewProject;
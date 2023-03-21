import Input from '../form/Input';
import styles from './ProjectForm.module.css';

function ProjectForm() {
  return(
    <form className={styles.form}>
      <Input 
        type="text" 
        text="Project name"
        name="name" 
        placeholder="Insert the project name"
      />
      <Input 
        type="number" 
        text="Project price"
        name="budget"
        placeholder="Insert the project price"
      />
    </form>
  );
}

export default ProjectForm;
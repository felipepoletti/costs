import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

import styles from './ProjectForm.module.css';

function ProjectForm({ btnText }) {
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
      <Select name="category_id" text="Select category"/>
      <SubmitButton text={btnText}/>
    </form>
  );
}

export default ProjectForm;
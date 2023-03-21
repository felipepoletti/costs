function ProjectForm() {
  return(
    <form>
      <div>
        <input type="text" placeholder="Insert the project name" />
      </div>
      <div>
        <input type="number" placeholder="Insert the project price" />
      </div>
      <div>
      <select name="category_id">
        <option disabled selected>Select the category</option>
      </select>
      </div>
      <div>
        <input type="submit" value="Create project" />
      </div>
    </form>
  );
}

export default ProjectForm;
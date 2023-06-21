class ApiRoute {


    static BASE_URL = "http://localhost:9090/api/v1";
    static TASK_URL = this.BASE_URL+ "/task";
    static GET_TASK_URL = (id) => `${this.TASK_URL}/${id}`;
    static ADD_TASK_URL = this.TASK_URL;
    static UPDATE_TASK_URL = (id) => `${this.TASK_URL}/${id}`;
    static DELETE_TASK_URL = (id) => `${this.TASK_URL}/${id}`;

}
export default ApiRoute;



import api from "./api";

class RepositoriesService {
  fetchAll = async () => {
    const { data } = await api.get("repositories");
    return data;
  };

  add = async ({ title, url, techs }) => {
    const { data } = await api.post("repositories", {
      title,
      url,
      techs,
    });
    return data;
  };

  delete = async (id) => {
    await api.delete(`repositories/${id}`);
  };

  like = async id => {
    const { data } = await api.post(`repositories/${id}/like`);
    return data;
  }
}

const Repository = new RepositoriesService();
export default Repository;

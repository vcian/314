export const ApiEndPoint = {
  login: "/signin",
  register: "/signup",
  profile: "/profile",
  logout: "/signout",
  private: {
    createWorkSpace: "/workspaces",
    updateWorkSpace: "/workspaces/",
    getByWorkSpace: "/workspaces/",
    getWorkSpaceList: "/workspaces?page=1&limit=10&search=1",
    uploadFile: "/upload",
    embedding: "/workspaces/edexa/embedding",
    localSystem: "/system/local-files"
  }
};

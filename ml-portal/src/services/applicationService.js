import api from "./api";
export async function getApplications(){const response=await api.get('/applications');return response.data;}
export async function getApplicationById(id){const response=await api.get(`/applications/${id}`);return response.data;}
export async function createApplication(data){const response=await api.post('/applications',data);return response.data;}
export async function toggleChecklistItem(){throw new Error('Application checklist sync is not available.');}
export default {getApplications,getApplicationById,createApplication,toggleChecklistItem};

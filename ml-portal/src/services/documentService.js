import api from "./api";
export async function getDocuments(){const response=await api.get('/documents');return response.data;}
export async function uploadDocument(info){const response=await api.post('/documents/upload',info);return response.data;}
export async function verifyDocument(id,fields){const response=await api.post(`/documents/${id}/verify`,{extractedData:fields});return response.data;}
export default {getDocuments,uploadDocument,verifyDocument};

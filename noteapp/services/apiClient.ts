export const api = "http://localhost:8800";

type RequestOptions = {
    method?: string;
    body?: any;
}

export const apiClient = async (endpoint: string, options: RequestOptions = {}) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${api}${endpoint}`, {
        method: options.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: options.body ? JSON.stringify(options.body) : undefined
    });

    if(!res.ok){
        const error = await res.json().catch(()=> ({msg: "Something went wrong"}));
        throw new Error(error.msg || 'Request failed');
    }

    return res.json();
}
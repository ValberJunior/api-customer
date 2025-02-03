export interface Customer{
    id: string,
    name: string,
    email: string,
    status: boolean,
    created_at: Date | null,
    updated_at: Date | null
}
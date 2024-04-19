export interface Notification {
    id: number;
    name: string;
    description: string;
    time: Date;
    is_read: boolean;
    type: string;
    source: number;
    image_url: string
}
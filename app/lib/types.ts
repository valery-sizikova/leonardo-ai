export type User = {
    id: string;
    name: string;
    jobTitle: string;
};

export type Episode = {
    id: string;
    name: string;
    episode: string;
    air_date: string;
}

export type Episodes = {
    episodes: {
        info: {
            pages: number;
        };
        results: Episode[];
    }
}
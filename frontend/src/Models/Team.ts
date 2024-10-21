export type Team = {
    teamId: number;
    teamName: string;
}

export type TeamMember = {
    userId: string;
    userName: string;
}

export type GetTeam = {
    teamId: number;
    teamName: string;
    teamMembers: TeamMember[];
}
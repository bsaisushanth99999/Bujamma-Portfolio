interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string
}

interface Image {
    _typr: "image";
    asset: {
        _ref: string;
        _type: "refrence";
    };
}

export interface PageInfo extends SanityBody {
    _type:"pageInfo";
    address: string;
    backgroundInformation : string;
    email: string;
    role: string;
    heroImage: Image;
    name: string;
    phoneNumber: string;
    profilePic: Image;
}


export interface Project extends SanityBody{
    title: string;
    _type:"project";
    image: Image;
    linkToBuild: string;
    summary: string;
    technologies: Technology[];
}

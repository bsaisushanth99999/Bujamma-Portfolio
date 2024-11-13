interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string
}

interface Image {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    hotspot?: {
        _type: "sanity.imageHotspot";
        width: number;
        x: number;
        y: number;
        height: number;
    };
    crop?: {
        right: number;
        top: number;
        left: number;
        bottom: number;
        _type: "sanity.imageCrop";
    };
}

export interface PageInfo extends SanityBody {
        phoneNumber: string;
        _createdAt: string;
        _updatedAt: string;
        socials: Array<{
          _key: string;
          _ref: string;
          _type: string;
        }>;
        backgroundInformation: string;
        address: string;
        _rev: string;
        _type: string;
        heroImage: {
          _type: string;
          asset: {
            _ref: string;
            _type: string;
          };
        };
        profilePic: {
          _type: string;
          asset: {
            _ref: string;
            _type: string;
          };
        };
        name: string;
        _id: string;
        email: string;
      };


export interface Project extends SanityBody{
    title: string;
    _type:"project";
    image: Image;
    linkToBuild: string;
    summary: string;
    technologies: Technology[];
}

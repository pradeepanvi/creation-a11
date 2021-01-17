export interface Homepage {
    welcome: {
        title: string;
        des: string;
        btnTxt: string;
    };
    sliderItems: {
        name: string;
        url: string;
    };
    ourProduct: {
        title: string;
        des: string;
        productItems: any;
    };
    ourService: {
        title: string;
        des: string;
        serviceItems: any;
    };
    ourClient: {
        title: string;
        des: string;
        clientItems: any;
    };
}

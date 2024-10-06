export interface Car {
  id: string;
  name: string;
  price: number;
  image: any;
}

export interface Details {
  id: string;
  name: string;
  price: number;
  image: any;
  type: string;
  tag: string;
  specs: {
    spec1: string;
    spec2: string;
    spec3: string;
    spec4: string;
    spec5: string;
    spec6: string;
  };
  moreSpecs: {
    spec1: string;
    spec2: string;
    spec3: string;
    spec4: string;
  };
}

export interface OnboardingType {
  id: number;
  title: string;
  desc: string;
  image: any;
  color: string;
}

export const cars: Car[] = [
  {
    id: "gm8_101",
    name: "Gm8 Ivory White",
    price: 5,
    image: require("../assets/images/gm8ivory.png"),
  },
  {
    id: "ga4_102",
    name: "Ga4 Sedan",
    price: 1.5,
    image: require("../assets/images/ga4sedan.png"),
  },
  {
    id: "gs4_103",
    name: "Gs4 Gold",
    price: 1.7,
    image: require("../assets/images/gs4gold.png"),
  },
  {
    id: "gs8_104",
    name: "All New Gs8",
    price: 2.5,
    image: require("../assets/images/gs8new.png"),
  },
  {
    id: "gs8_105",
    name: "Gs8 Moonlight Grey",
    price: 2.5,
    image: require("../assets/images/gs8moon.png"),
  },
  {
    id: "gaclof_106",
    name: "Gac Lofer",
    price: 2.5,
    image: require("../assets/images/lofer.png"),
  },
];
export const details: Details[] = [
  {
    id: "gm8_101",
    name: "Gm8 Ivory White",
    price: 3000000,
    image: require("../assets/images/gm8ivory.png"),
    type: "Fuel",
    tag: "Ivory White luxury",
    specs: {
      spec1: "3.0L V6",
      spec2: "8-Speed",
      spec3: "0-60 mph",
      spec4: "22/28 mpg",
      spec5: "0-60 mph",
      spec6: "22/28 mpg"
    },
    moreSpecs: {
      spec1: "7 passengers",
      spec2: "25.5 cubic feet",
      spec3: "5-star rating",
      spec4: "12.3 vol"
    }
  },
  {
    id: "ga4_102",
    name: "Ga4 Sedan",
    price: 2500000,
    image: require("../assets/images/ga4sedan.png"),
    type: "Fuel",
    tag: "comfort sedan",
    specs: {
      spec1: "3.0L V6",
      spec2: "8-Speed",
      spec3: "0-60 mph",
      spec4: "22/28 mpg",
      spec5: "0-60 mph",
      spec6: "22/28 mpg",
    },
    moreSpecs: {
      spec1: "7 passengers",
      spec2: "25.5 cubic feet",
      spec3: "5-star rating",
      spec4: "12.3 vol"
    }
  },
  {
    id: "gs4_103",
    name: "Gs4 Gold",
    price: 1700000,
    image: require("../assets/images/gs4gold.png"),
    type: "Fuel and gas",
    tag: "Golden luxury",
    specs: {
      spec1: "3.0L V6",
      spec2: "8-Speed",
      spec3: "0-60 mph",
      spec4: "22/28 mpg",
      spec5: "0-60 mph",
      spec6: "22/28 mpg"
    },
    moreSpecs: {
      spec1: "7 passengers",
      spec2: "25.5 cubic feet",
      spec3: "5-star rating",
      spec4: "12.3 vol"
    }
  },
  {
    id: "gs8_104",
    name: "All New Gs8",
    price: 3500000,
    image: require("../assets/images/gs8new.png"),
    type: "Fuel",
    tag: "Seal teal green goddess",
    specs: {
      spec1: "3.0L V6",
      spec2: "8-Speed",
      spec3: "0-60 mph",
      spec4: "22/28 mpg",
      spec5: "0-60 mph",
      spec6: "22/28 mpg"
    },
    moreSpecs: {
      spec1: "7 passengers",
      spec2: "25.5 cubic feet",
      spec3: "5-star rating",
      spec4: "12.3 vol"
    }
  },
  {
    id: "gs8_105",
    name: "Gs8 Moonlight Grey",
    price: 2500000,
    image: require("../assets/images/gs8moon.png"),
    type: "Fuel",
    tag: "moonlight grey radiance",
    specs: {
      spec1: "3.0L V6",
      spec2: "8-Speed",
      spec3: "0-60 mph",
      spec4: "22/28 mpg",
      spec5: "0-60 mph",
      spec6: "22/28 mpg"
    },
    moreSpecs: {
      spec1: "7 passengers",
      spec2: "25.5 cubic feet",
      spec3: "5-star rating",
      spec4: "12.3 vol"
    }
  },
  {
    id: "gaclof_106",
    name: "Gac Lofer",
    price: 1500000,
    image: require("../assets/images/lofer.png"),
    type: "Fuel",
    tag: "Solid lofer vehicle",
    specs: {
      spec1: "3.0L V6",
      spec2: "8-Speed",
      spec3: "0-60 mph",
      spec4: "22/28 mpg",
      spec5: "0-60 mph",
      spec6: "22/28 mpg"
    },
    moreSpecs: {
      spec1: "7 passengers",
      spec2: "25.5 cubic feet",
      spec3: "5-star rating",
      spec4: "12.3 vol"
    }
  },
];

export const onboarding: OnboardingType[] =  [
  {
      id: 1,
      title: "Premium All New GS8",
      desc: "Rent the fancy wheels you've been eyeing",
      image: require("../assets/images/gs8new.png"),
      color: "#00616D"
  },
  {
      id: 2,
      title: "Durable GM8",
      desc: "One glimpse of it is enough to impress",
      image: require("../assets/images/gm8ivory.png"),
      color: "#FFFFFF"
  },
  {
      id: 3,
      title: "Luxury Car Rental",
      desc: "Rent the fancy wheels you've been eyeing",
      image: require("../assets/images/gs4gold.png"),
      color: "#926600"
  },
  {
      id: 4,
      title: "CNG Automated Vehicle",
      desc: "Move with confidence on a budget",
      image: require("../assets/images/ga4sedan.png"),
      color: "#9B0913"
  },   
]
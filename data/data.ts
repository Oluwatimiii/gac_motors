export interface Car {
  id: number;
  name: string;
  price: number;
  image: any;
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
    id: 1,
    name: "Gm8 Ivory White",
    price: 5,
    image: require("../assets/images/gm8ivory.png"),
  },
  {
    id: 2,
    name: "Ga4 Sedan",
    price: 1.5,
    image: require("../assets/images/ga4sedan.png"),
  },
  {
    id: 3,
    name: "Gs4 Gold",
    price: 1.7,
    image: require("../assets/images/gs4gold.png"),
  },
  {
    id: 4,
    name: "All New Gs8",
    price: 2.5,
    image: require("../assets/images/gs8new.png"),
  },
  {
    id: 5,
    name: "Gs8 Moonlight Grey",
    price: 2.5,
    image: require("../assets/images/gs8moon.png"),
  },
  {
    id: 6,
    name: "Gac Lofer",
    price: 2.5,
    image: require("../assets/images/lofer.png"),
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
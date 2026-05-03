interface Developer<T, X = null> {
  name: string;
  salary: number;
  device: {
    brand: string;
    model: string;
    releasedYear: string;
  };
  smartWatch: T;
  bikes?: X;
}

type TBrandWithoutWatch = {
  heartRate: string;
  stopWatch: boolean;
};

const poorDeveloper: Developer<
  TBrandWithoutWatch,
  {
    model: "Bazaz";
    engineCapacity: "200cc";
  }
> = {
  name: "poor",
  salary: 20,
  device: {
    brand: "lenevo",
    model: "Y30",
    releasedYear: "2015",
  },
  smartWatch: {
    heartRate: "Okay",
    stopWatch: true,
  },
};

type TBrandWithWatch = {
  heartRate: string;
  callSupport: boolean;
  calculator: boolean;
  AIFeatures: boolean;
};

const richDeveloper: Developer<TBrandWithWatch> = {
  name: "Rich",
  salary: 100,
  device: {
    brand: "HP",
    model: "Y30",
    releasedYear: "2026",
  },
  smartWatch: {
    heartRate: "Okay",
    callSupport: true,
    calculator: true,
    AIFeatures: true,
  },
  bikes: null,
};

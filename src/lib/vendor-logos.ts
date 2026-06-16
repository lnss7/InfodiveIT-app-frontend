import type { StaticImageData } from "next/image";
import awsLogo from "@/assets/AWS Logo.svg";
import acronisLogo from "@/assets/Acronis Logo.svg";
import appleLogo from "@/assets/Apple Logo.svg";
import dellLogo from "@/assets/Dell Logo.svg";
import ibmLogo from "@/assets/IBM Logo.svg";
import lenovoLogo from "@/assets/Lenovo Logo.svg";
import microsoftLogo from "@/assets/Microsoft Logo.svg";
import redhatLogo from "@/assets/Red Hat Logo.svg";
import suseLogo from "@/assets/Suse Logo.svg";
import veeamLogo from "@/assets/Veeam Logo.svg";
import virtuozzoLogo from "@/assets/Virtuozzo Logo.svg";

export const VENDOR_LOGOS: Record<string, StaticImageData> = {
  AWS: awsLogo,
  Acronis: acronisLogo,
  Apple: appleLogo,
  "Dell Technologies": dellLogo,
  IBM: ibmLogo,
  Lenovo: lenovoLogo,
  Microsoft: microsoftLogo,
  "Red Hat": redhatLogo,
  SUSE: suseLogo,
  Veeam: veeamLogo,
  Virtuozzo: virtuozzoLogo,
};

export const VENDOR_URLS: Record<string, string> = {
  AWS: "https://aws.amazon.com",
  Acronis: "https://www.acronis.com",
  Apple: "https://www.apple.com",
  "Dell Technologies": "https://www.dell.com",
  IBM: "https://www.ibm.com",
  Lenovo: "https://www.lenovo.com",
  Microsoft: "https://www.microsoft.com",
  "Red Hat": "https://www.redhat.com",
  SUSE: "https://www.suse.com",
  Veeam: "https://www.veeam.com",
  Virtuozzo: "https://www.virtuozzo.com",
};


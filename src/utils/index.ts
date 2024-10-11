import { nav_details } from "@/constants";

export const getPathname = (pathname: string) => {
  // TODO: V konstante dodaj pathnames, kjer bodo shranjeni url-ji in naslovi, in nato v tej funkciji return-i object s title-om in url-jem

  const navDetail = nav_details.find((item) => item.url === pathname);

  if (navDetail) return navDetail;
  return null;
};

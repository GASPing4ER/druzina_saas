export const getPathname = (pathname: string) => {
  // TODO: V konstante dodaj pathnames, kjer bodo shranjeni url-ji in naslovi, in nato v tej funkciji return-i object s title-om in url-jem
  if (pathname === "/") {
    return "Nadzorna plošča";
  }
  return "Ta stran še ni dodana!";
};

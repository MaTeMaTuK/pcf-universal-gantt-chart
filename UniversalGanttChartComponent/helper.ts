export const isErrorDialogOptions = (
  error: ComponentFramework.NavigationApi.ErrorDialogOptions | any
): error is ComponentFramework.NavigationApi.ErrorDialogOptions => {
  return (
    (error as ComponentFramework.NavigationApi.ErrorDialogOptions).errorCode !==
    undefined
  );
};

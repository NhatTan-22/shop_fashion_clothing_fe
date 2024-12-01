// Libs
import { ReactNode, createContext, useState } from 'react';
// Components, Layouts, Pages
import { Loading } from '~/components';
// Others
// Styles, images, icons

type Props = {
    children?: ReactNode;
};

type LoadingContextType = {
    show: () => void;
    hide: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const LoadingProvider = (props: Props) => {
    //#region Destructuring Props
    const { children } = props;
    //#endregion Destructuring Props

    //#region Declare Hook
    //#endregion Declare Hook

    //#region Selector
    //#endregion Selector

    //#region Declare State
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const value = {
        loading: isLoading,
        show: () => setIsLoading(true),
        hide: () => setIsLoading(false),
    };
    //#endregion Declare State

    //#region Implement Hook
    //#endregion Implement Hook

    //#region Handle Function
    //#endregion Handle Function

    return (
        <LoadingContext.Provider value={value}>
            {isLoading && <Loading />}
            {children}
        </LoadingContext.Provider>
    );
};

export { LoadingContext, LoadingProvider };

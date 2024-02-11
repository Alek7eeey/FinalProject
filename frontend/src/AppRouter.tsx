import {Route, Routes, BrowserRouter} from "react-router-dom";
import Index from "./containers";
import NotFound from "./views/NotFound";
import {ReactElement} from "react";

const AppRouter = (): ReactElement => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoadingService } from "../loading/loading.service";
import { finalize } from "rxjs";

export const loadingInteceptor: HttpInterceptorFn = (req, next) => {
    
    const loadingService = inject(LoadingService);
    loadingService.loadingOn();
    return next(req)
    .pipe(
        finalize(() => {
            loadingService.loadingOff();
        })
    )
}
package project.forAll.controller.api;

import com.google.gson.Gson;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(APIController.BASE_PATH)
public abstract class APIController {

    protected static final String BASE_PATH = "/api/v1";

    private static final Gson GSON = new Gson();
    /** data 를 JSON 으로 변환 **/
    protected static String toJSON(final Object obj) { return GSON.toJson(obj);}
    protected static String toJson(final Object obj, final Class<JSONResponse> cls) {
        return GSON.toJson(obj, cls);
    }
    protected static String responseMessage(final String status, final String message) {
        return toJson(new JSONResponse(status, message), JSONResponse.class);
    }
    /** errorReponse 생성 **/
    protected static String errorResponse(final String message) {
        return responseMessage("failed", message);
    }
    /** successReponse 생성 **/
    protected static String successResponse(final String message) {
        return responseMessage("success", message);
    }
    protected static class JSONResponse {

        /** response status (success/failed) */
        final String status;

        /** Message (에러 메세지, 또는 어떤 response 인지에 대한 message) */
        final String message;

        /**
         * Default constructor for JSONResponse.
         *
         * @param status The status (success/failed)
         * @param message The message
         */
        public JSONResponse(final String status, final String message) {
            this.status = status;
            this.message = message;
        }
    }
}

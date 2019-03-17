import { uiReducer } from "../reducer";
import { uiActions } from "../actions";

describe("ui reducer", () => {
    test("should return initial state by default", () => {
        expect(uiReducer(void 0, {})).toMatchSnapshot();
    });
    test("should handle START_FETCHING action", () => {
        expect(uiReducer( void 0, uiActions.startFetching())).toMatchSnapshot();
    });
    test("should handle STOP_FETCHING action", () => {
        expect(uiReducer( void 0, uiActions.stopFetching())).toMatchSnapshot();
    });
    test("should handle EMIT_ERROR action", () => {
        expect(uiReducer( void 0, uiActions.emitError(__.error, null))).toMatchSnapshot();
    });
});

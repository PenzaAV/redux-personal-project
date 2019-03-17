import { uiActions } from "../actions";

describe('Ui actions', () => {
    test('startFetching', () => {
        expect(uiActions.startFetching()).toMatchSnapshot();
    });
    test('stopFetching', () => {
        expect(uiActions.stopFetching()).toMatchSnapshot();
    });
    test('emitError', () => {
        expect(uiActions.emitError(__.error)).toMatchSnapshot();
    });
});

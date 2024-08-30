/* eslint-disable @typescript-eslint/naming-convention */
import { EXTENSION_CONSTANT } from 'constant';
function Button1() {
    return (
        <button id={EXTENSION_CONSTANT.ELEMENT_IDS.button1} className='activate_gambit'>
            Click to activate gambit
        </button>
    );
}

export { Button1 };
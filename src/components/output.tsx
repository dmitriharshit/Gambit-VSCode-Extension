/* eslint-disable @typescript-eslint/naming-convention */
import { EXTENSION_CONSTANT } from 'constant';
function Input() {
    return (
        <input type="textbox" id={EXTENSION_CONSTANT.ELEMENT_IDS.outputbox} name='outputarea' className='outputarea' readOnly/>
    );
}

export { Input };
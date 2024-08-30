import { EXTENSION_CONSTANT } from 'constant';
function Form() {

    return (
        <form id={EXTENSION_CONSTANT.ELEMENT_IDS.panel} >

            {/* Choose a machine model  */}
            <div className='dropdown-container'>
                <select id="dropdown1" name='dropdown1' className='dropdown1'>
                    <div className='dropdown1-content'>
                        <option value="" disabled selected>Machine model </option>
                        <option value="PSO !TSO">PSO !TSO</option>
                        <option value="PSO !SC">PSO !SC</option>
                        <option value="TSO !SC">TSO !SC</option>
                    </div>
                </select>

                <select id="dropdown2" name='dropdown2' className='dropdown2'>
                    
                    <div className='dropdown1-content'>
                        <option value="" disabled selected>Select an command</option>
                        <option value="diffmm">diffmm</option>
                        <option value="verify">verify</option>
                        <option value="dbg_reorder_d ">dbg_reorder_d </option>
                        <option value="dbg_reorder_se ">dbg_reorder_se </option>
                        <option value="sgt_fence_d ">sgt_fence_d </option>
                        <option value="sgt_fence_se">sgt_fence_se</option>
                        <option value="dbg_atomic">dbg_atomic</option>
                        <option value="sgt_atomic">sgt_atomic</option>
                    </div>

                </select>
            </div>

            <textarea
                className='inputarea'
                name="query"
                rows={1}
            // cols={25}s
            />
            <div className='buttonloader'>
                <button className='submitBtn' id="submitBtn" disabled>Submit</button>
                <div className="loader" id="loader"></div></div>
        </form>
    );
}
export { Form };

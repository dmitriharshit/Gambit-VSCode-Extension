/* eslint-disable @typescript-eslint/naming-convention */
import { Button1 } from 'components/Button';
import { Form } from 'components/panel';
import { Input } from 'components/output';



interface LeftPanelProp {
    message: string
}

function LeftPanel({
    message
}: LeftPanelProp) {

    return (
        <div className='panel-wrapper'>
            <span className='panel-info'>{message}</span>
            <Button1></Button1>
            <br></br>
            <br></br>
            <Form></Form>
            <br></br>
            <Input></Input>
            
        </div>

    );
}

export default LeftPanel;
import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Header from "../components/header/Header";
import MySubject from "../components/user/subjects/MySubject";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Header">
                <Header/>
            </ComponentPreview>
            <ComponentPreview path="/MySubject">
                <MySubject/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
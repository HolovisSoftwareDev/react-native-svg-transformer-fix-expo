import React, { memo, useEffect, useState } from 'react';

interface Props {
    source: string
    width?: number | string
    height?: number | string
    fill?: string
    replace: any
}

const regBase64 = /^(.+)\,(.+)$/
const regPropReplace = /^\s*\{\s*([a-zA-Z0-9]*)\.?([a-zA-Z0-9]+)\s*\}\s*$/

const Index = memo(({ source, replace, ...rest }: Props) => {

    const { width, height } = {
        width: 10,
        height: 10,
        ...rest,
    }

    const [xml, setXml] = useState(null)

    const xmlToBase64 = (xml: string) => {

        let nxml = xml;

        for (const key in replace) {

            let value = replace[key]

            if (regPropReplace.test(value)) {
                value = rest[value.replace(regPropReplace, '$2')]
                if (!value) break;
            }

            nxml = nxml.replace(
                new RegExp(`([a-z-A-Z0-9]="|')(${key})("|')`, 'g')
                , `$1${value}$3`
            )
        }

        return `data:image/svg+xml;base64,${btoa(nxml)}`
    }

    useEffect(() => {

        const ab = new AbortController()

        if (source) {
            if (regBase64.test(source)) {
                setXml(atob(source.replace(regBase64, '$2')))
            } else {
                fetch(window.location.origin + source, { signal: ab.signal })
                    .then(res => res.text())
                    .then(xml => setXml(xml))
                    .catch(e => console.error(e))
            }
        }

        return () => { ab.abort() }
    }, [])

    return xml ? <img width={width} height={height} src={xmlToBase64(xml)} /> : null
})

export default (svgrrc: any) => {

    const { replaceAttrValues } = svgrrc

    return (source: string) => {
        return (props: any) => <Index {...props} replace={replaceAttrValues} source={source} />;
    }
}
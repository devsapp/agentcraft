export function unicodeDecode(unicode:any) {

    let result = unicode;
    try {
        result = JSON.parse(unicode);
    } catch (error) {
        console.error('Invalid URI sequence', error);
    }
    return result;
}

export async function readAndRenderStream(
    readerInstance: ReadableStream,
    renderInvoke: (input: string) => void,
    closeCallBack: () => void
) {

    if (typeof readerInstance !== 'undefined') {
        const reader = readerInstance.getReader();
        const decoder = new TextDecoder("utf-8");
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                closeCallBack && closeCallBack();
                break;
            }

            const _value = decoder.decode(value);

            const msg = JSON.parse("{\"data\":" + _value.replace('data', '').trim() + "}");
            renderInvoke(decoder.decode(value));
        }
    }
}


export function prettyObject(msg: any) {
    const obj = msg;
    if (typeof msg !== "string") {
        msg = JSON.stringify(msg, null, "  ");
    }
    if (msg === "{}") {
        return obj.toString();
    }
    if (msg.startsWith("```json")) {
        return msg;
    }
    return ["```json", msg, "```"].join("\n");
}

export function getRefSize(ref) {
    if (ref.current) {
        const compStyles = window.getComputedStyle(ref.current);
        const width = Number(compStyles.getPropertyValue('width').replace(/[^\d.]/g, ''))
        const height = Number(compStyles.getPropertyValue('height').replace(/[^\d.]/g, ''))
        return { width, height }
    }

    console.log("Ref is invalid or null")
}
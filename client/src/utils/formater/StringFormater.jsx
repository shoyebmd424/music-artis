export function formatPathToTitle(path) {
    const lastSegment = path.substring(path.lastIndexOf('/') + 1);
    const pathWithSpaces = lastSegment.replace(/-/g, ' ');
    const title = pathWithSpaces.replace(/\b\w/g, char => char.toUpperCase());

    return title;
}

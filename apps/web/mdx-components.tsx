import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
    h1: (props) => <h1 className="text-chocolate text-3xl sm:text-4xl font-bold mt-2 mb-4" {...props} />,
    h2: (props) => <h2 className="text-chocolate text-2xl sm:text-3xl font-bold mt-10 mb-3" {...props} />,
    h3: (props) => <h3 className="text-chocolate text-xl font-semibold mt-8 mb-2" {...props} />,
    p: (props) => <p className="text-chocolate leading-relaxed mt-4" {...props} />,
    ul: (props) => <ul className="list-disc list-inside text-chocolate leading-relaxed mt-4 space-y-1" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside text-chocolate leading-relaxed mt-4 space-y-1" {...props} />,
    a: (props) => <a className="text-cafe font-semibold underline hover:text-apricot transition-colors duration-200" {...props} />,
    strong: (props) => <strong className="text-chocolate font-semibold" {...props} />,
};

export function useMDXComponents(): MDXComponents {
    return components;
}

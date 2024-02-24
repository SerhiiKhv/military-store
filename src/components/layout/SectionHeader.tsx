export const SectionHeader = ({subHeader, mainHeader}: {subHeader?: any, mainHeader?: any}) => {
    return(
        <section className="max-w-sm">
            <h3 className="uppercase text-gray-500 font-semibold leading-4">
                {subHeader}
            </h3>
            <h2 className="bg-gradient-to-r from-neonNazar to-blue-600 bg-clip-text text-transparent
            font-semibold text-4xl">
                {mainHeader}
            </h2>
        </section>
    )
}
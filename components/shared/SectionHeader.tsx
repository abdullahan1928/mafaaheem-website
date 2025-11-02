const SectionHeader = ({ heading }: { heading: string }) => {
    return (
        <h2 className="section-heading scroll-reveal text-4xl md:text-5xl urdu-italic">
            <span className="decoration"></span>
            {heading}
        </h2>
    )
}

export default SectionHeader
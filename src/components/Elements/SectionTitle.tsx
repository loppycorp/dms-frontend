function SectionTitle(props: { component: SectionTitle }) {
  return <div className={`form-title`}>{props.component.label}</div>;
}

export default SectionTitle;

import { Session } from "next-auth";
import ButtonModalElement from "@/components/Fields/Buttons/ButtonModalElement";

interface ComponentMap {
  [key: string]: React.FC<{
    component: any;
    page: PageItem;
    api: string;
    session: Session | null;
    buttonClasses?: string | null;
  }>;
}

const componentMap: ComponentMap = {
  "elements.button-modal": ButtonModalElement,
};

function ButtonItems(props: {
  buttons: InputItem[];
  page: PageItem;
  session: Session | null;
  buttonClasses?: string | null;
}) {
  return (
    <div className="flex gap-3 mb-1 flex-wrap">
      {props.buttons.map((item, index) => {
        const Component = componentMap[item.__component];
        if (!Component) {
          throw new Error(`Unknown form key: ${item.__component}`);
        }
        return (
          <div className={`${item.classes}`} key={index}>
            <Component
              component={item}
              page={props.page}
              api={props.page.api_url}
              session={props.session}
              buttonClasses={props.buttonClasses}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ButtonItems;

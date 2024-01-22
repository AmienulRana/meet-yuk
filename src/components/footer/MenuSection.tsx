// MenuSection.jsx

interface MenuItem {
  text: string;
}

const MenuItem = ({ text }: MenuItem) => {
  return (
    <li>
      <p className="text-gray-400 block pb-2 text-sm">
        {text}
      </p>
    </li>
  );
};

interface IMenuSection {
  title: string;
  items: string[];
}

const MenuSection = ({ title, items }: IMenuSection) => (
  <div className="w-full lg:w-4/12 px-4">
    <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
      {title}
    </span>
    <ul className="list-unstyled">
      {items.map((item, index) => (
        <MenuItem key={index} text={item} />
      ))}
    </ul>
  </div>
);

export default MenuSection;

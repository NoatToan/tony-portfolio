import VariantsLayout from '@/_modules/layouts/VariantsLayout';

export default function Layout({ children }: LayoutProps<'/'>) {
  return <VariantsLayout>{children}</VariantsLayout>;
}

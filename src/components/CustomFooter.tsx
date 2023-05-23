import { Footer } from "flowbite-react"

const CustomFooter= ()=> {
  return (
    <Footer container={true}>
      <div className="w-full text-center">
        <div className="w-full justify-between flex flex-col items-start space-y-5 sm:flex-row sm:items-center sm:space-y-0">
          <Footer.Brand
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
          />
          <Footer.LinkGroup
            className="flex-row space-x-3 items-center sm:mt-0"
          >
            <Footer.Link href="#">
              About
            </Footer.Link>
            <Footer.Link href="#">
              Privacy Policy
            </Footer.Link>
            <Footer.Link href="#">
              Licensing
            </Footer.Link>
            <Footer.Link href="#">
              Contact
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          href="#"
          by="TNC Team"
          year={2023}
        />
      </div>
    </Footer>
  )
}

export default CustomFooter
import { Tooltip } from "flowbite-react"

export const ArticleComponent= (props: AtricleDataInterface)=> {
  if (props.type=='paragraph') {
    return <p
      className="leading-loose text-justify"
    >
      {props.content}
    </p>
  }

  if (props.type=='list') {
    const content= props.content as string[]
    
    return (
      <ul
        className="list-decimal pl-7 space-y-2"
      >
        {
          content.map((content, k)=> (
            <li key={k} className="leading-loose">{content}</li>
          ))
        }
      </ul>
    )
  }

  if (props.type=='subtitle') {
    return <h2
      className="text-xl font-bold"
    >
      {props.content}
    </h2>
  }

  return <></>
}

export const SocialMediaBtn= ({Icon, className, onClick, title}: SocialMediaBtnType)=> {
  return (
    <Tooltip content={title} placement="top-start">
      <div onClick={()=> onClick()} className={`${className} w-[40px] h-[40px] flex justify-center items-center text-white rounded-full cursor-pointer`}>        
        <Icon className="text-xl"/>
      </div>
    </Tooltip>
  )
}
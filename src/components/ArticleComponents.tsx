interface AtricleDataInterface {
  type: string
  content: string | string[]
}

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
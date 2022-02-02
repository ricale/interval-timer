import { Fragment } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Row,
  TextField,
} from "components";
import { IntervalDetail } from "store";
import { fillWithZero } from "utils";
import getFieldValue from "./getFieldValue";

const FIELDS: ['hours', 'minutes', 'seconds'] = ['hours', 'minutes', 'seconds'];

type IntervalItemProps = {
  item: IntervalDetail
  editable?: boolean
  onChange: (item: IntervalDetail) => void
}
function IntervalItem({
  item,
  editable,
  onChange,
}: IntervalItemProps) {
  return (
    <Card sx={{ width: 150 }}>
      <CardHeader
        subheader={`#${item.index + 1}`}
        sx={{ padding: 1.5, paddingBottom: 0, }}
        />
      <CardContent
        sx={{
          padding: 1.5,
          paddingTop: 1,
          '&:last-child': { paddingBottom: 1.5 }
        }}>
        <Row gap={1} alignItems='center'>
          {FIELDS.map((field, i) =>
            <Fragment key={field}>
              {i !== 0 &&
                <span>:</span>
              }
              <TextField
                label=''
                variant='standard'
                value={fillWithZero(item[field])}
                onChange={(evt) => {
                  onChange({ ...item, [field]: getFieldValue(field, evt.target.value) });
                }}
                disabled={!editable}
                sx={{ '& input': {textAlign: 'center'}}}
                />
            </Fragment>
          )}
        </Row>
      </CardContent>
    </Card>
  )
}

export default IntervalItem;

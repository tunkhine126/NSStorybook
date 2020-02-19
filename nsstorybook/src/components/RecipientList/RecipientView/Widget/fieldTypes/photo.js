/**
 *
 * Photos Field Type
 *
 */

import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl, intlShape } from 'react-intl';
import Viewer from 'react-viewer';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import placeHolderImg from 'assets/images/familyPlaceholder.png';
import { generateImg } from 'utils/helpers';
import globalMessages from 'messages';
import { FieldsContext } from '../../context/fields';
import { recipientListStyles } from '../../../styles';

export function Photo({
  intl,
  field,
  values,
  label,
  editMode = false,
  className,
  recipientData,
}) {
  const classes = recipientListStyles();
  const {
    activePhotoProps: { activePhotoField, setActivePhotoField },
    recipientPhotoProps: { setRecipientPhoto },
  } = useContext(FieldsContext);

  const [localPhoto, setLocalPhoto] = useState(
    values[field.name] ? generateImg(values[field.name]) : placeHolderImg
  );

  const inputRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const getBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => cb(reader.result);
    reader.onerror = error => {
      console.log('Error converting file to base64!: ', error);
    };
  };

  const editModeCardAction = () => {
    if (inputRef.current) {
      inputRef.current.click();
      setActivePhotoField(field.name);
    }
  };

  const photoViewMode = () => {
    setVisible(true);
  };

  return (
    <Card className={className}>
      {editMode && (
        <Typography gutterBottom variant="caption" className={classes.caption}>
          {label}
        </Typography>
      )}

      <CardActionArea
        className={classes.recipientChildImg}
        onClick={editMode ? editModeCardAction : photoViewMode}
      >
        <CardMedia
          component="img"
          alt={field.contexts.us_en.label}
          height="100%"
          image={localPhoto}
          title={field.contexts.us_en.label}
        />
        {editMode && (
          <>
            <p className={clsx(classes.imgActionText, 'img-action-text')}>
              {intl.formatMessage(globalMessages.changePhoto)}
            </p>
            <input
              type="file"
              ref={inputRef}
              onChange={e =>
                getBase64(e.target.files[0], result => {
                  if (recipientData.photos[activePhotoField] !== result) {
                    setRecipientPhoto({
                      [activePhotoField]: result,
                    });
                    setLocalPhoto(result);
                  }
                })
              }
              accept="image/jpeg, image/png, image/tiff, image/ief, image/gif"
            />
          </>
        )}
      </CardActionArea>
      <Viewer
        visible={visible}
        changeable={false}
        showTotal={false}
        zIndex={1200}
        noNavbar
        onClose={() => setVisible(false)}
        images={[
          {
            src: localPhoto,
            alt: field.contexts.us_en.label,
          },
        ]}
      />
    </Card>
  );
}

Photo.propTypes = {
  intl: intlShape.isRequired,
  values: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  recipientData: PropTypes.object.isRequired,
  className: PropTypes.string,
  editMode: PropTypes.bool,
};

const intlPhoto = injectIntl(Photo);

export default intlPhoto;

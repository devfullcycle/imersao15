package model

import (
	"time"

	"github.com/asaskevich/govalidator"
)

func init() {
	// setar todos os campos marcados como required para validar por padrão
	govalidator.SetFieldsRequiredByDefault(true)
}

type Base struct {
	ID        string    `json:"id" gorm:"type:uuid;primary_key" valid:"uuid"`
	CreatedAt time.Time `json:"created_at" valid:"-"`
	UpdatedAt time.Time `json:"updated_at" valid:"-"`
}

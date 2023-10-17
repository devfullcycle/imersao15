package model

import (
	"github.com/asaskevich/govalidator"
	"time"
)

func init() {
	// setar todos os campos marcados como required para validar por padrão
	govalidator.SetFieldsRequiredByDefault(true)
}

type Base struct {
	ID        string    `json:"id" valid:"uuid"`
	CreatedAt time.Time `json:"created_at" valid:"-"`
	UpdatedAt time.Time `json:"updated_at" valid:"-"`
}
